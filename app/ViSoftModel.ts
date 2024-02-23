
export interface Point3D{
    X: number;
    Y: number;
    Z: number;
}

export interface Point2D{
    X: number;
    Y: number;
}

export interface Geometry{
    Coords: Array<Point3D>;
    Indexes: Array<number>;
    Normals: Array<Point3D>;
    TexCoords: Array<Point2D>;
}

export interface Material{
    DiffuseColor: string;
    DiffuseMap: any;
    Name: string;
}

export interface ViSoftModel{
    Children: any;
    Geometry: Geometry;
    Material: Material;
    Name: string;
}