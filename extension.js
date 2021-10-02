const { Clutter, Shell, GObject } = imports.gi;
const Main = imports.ui.main;
const IconGrid = imports.ui.iconGrid;
const AppDisplay = imports.ui.appDisplay;


class Extension {
	constructor() {
	}

	enable() {
		// more rows and columns in application overview grid
		const { appDisplay } = Main.overview._overview.controls;
		appDisplay._grid._gridModes.push({ columns: 10, rows: 4 });
		appDisplay._grid._setGridMode(appDisplay._grid._gridModes.length - 1);

		// more rows and columns in application folder
		AppDisplay.FolderGrid = GObject.registerClass(
			class FolderGrid extends IconGrid.IconGrid {
				_init() {
					super._init({
						allow_incomplete_pages: false,
						columns_per_page: 8,
						rows_per_page: 4,
						page_halign: Clutter.ActorAlign.CENTER,
						page_valign: Clutter.ActorAlign.CENTER,
					});
				}

				adaptToSize(width, height) {
					this.layout_manager.adaptToSize(width, height);
				}
			}
		);
	}

    disable() {
    }
}

function init() {
	return new Extension();
}
