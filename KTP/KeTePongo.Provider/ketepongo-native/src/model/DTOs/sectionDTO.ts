export class SectionDTO {
    constructor(id){
        this.id = id;
    }
    changeVersion: number | null;
    id: number;
    name: string;
    displayOrder: number;
}
