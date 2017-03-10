const _ = require('lodash');

let packages = _.filter($manager.listPackages(), { lifecycle: 'unpacked' });

_.each(packages, (pkg) => initializePackage(pkg));

// Initializes a package
function initializePackage(pkg) {
  let opts = {};

  // Use inputs file if it exists (legacy)
  let inputsFile = `/${pkg.name}-inputs.json`;
  if ($file.exists(inputsFile)) {
    opts.args = ['--inputs-file', inputsFile];
  } else {
    opts.hashArgs = populateOptions(pkg);
  }

  interceptOutput(pkg);
  $manager.initializePackage(pkg.id, opts);
}

// Returns a map of package options and their values populated from the corresponding ENV vars
function populateOptions(pkg) {
  return _.reduce(pkg.getOptions(), (allOpts, opt) => {
    let envName = getEnvName(pkg, opt);
    if (process.env[envName]) {
      allOpts[opt.name] = process.env[envName];
    }
    return allOpts;
  }, {});
}

// Returns the ENV name for an option
// e.g. replicationMode -> POSTGRESQL_REPLICATION_MODE
function getEnvName(pkg, opt) {
  return `${pkg.name}_${_.snakeCase(opt.name)}`.toUpperCase();
}

// Intercept ouput and replace references to nami option names with ENV var names
function interceptOutput(pkg) {
  _.each([process.stdout, process.stderr], (stream) => {
    stream.write = ((write) => {
      return (str, encoding, fd) => {
        // Replace references to '--opt' and 'opt' with the corresponding ENV var name
        _.each(pkg.getOptions(), (opt) => str = str.replace(new RegExp('(--)?'+opt.name, 'g'), getEnvName(pkg, opt)));
        write.apply(stream, [str, encoding, fd]);
      };
    })(stream.write);
  });
}
