import { Publish } from '../../common/transformer/decorators/publish';

export class ShowLanguagesDTO {

    @Publish()
    public id: number;

    @Publish()
    public language: string;

    @Publish()
    public isActive: boolean;

    @Publish()
    public isDeleted: boolean;

    @Publish()
    public token?: string;
}
