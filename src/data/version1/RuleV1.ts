import { IStringIdentifiable } from 'pip-services3-commons-nodex';

export class RuleV1 implements IStringIdentifiable {
    public id: string;
    public group: string;
    public name: string;
    public description?: string;
    public priority: number;
    public params: any;
    public condition: string;
    public action: string;
    public disabled: boolean;
}