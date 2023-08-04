export class PlaceGrid {
  grid : Array<Array<any>>

  constructor(data: any | undefined) {
    this.grid = data.grid || undefined;
  }
}
