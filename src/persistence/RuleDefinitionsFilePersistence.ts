import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { RuleDefinitionsMemoryPersistence } from './RuleDefinitionsMemoryPersistence';
import { RuleV1 } from '../data/version1/RuleV1';

export class RuleDefinitionsFilePersistence extends RuleDefinitionsMemoryPersistence {
	protected _persister: JsonFilePersister<RuleV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<RuleV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }
}