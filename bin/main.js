let RuleDefinitionsProcess = require('../obj/src/container/RuleDefinitionsProcess').RuleDefinitionsProcess;

try {
    new RuleDefinitionsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
