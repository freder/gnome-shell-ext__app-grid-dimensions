const { GObject, Clutter } = imports.gi;
const Main = imports.ui.main;
const IconGrid = imports.ui.iconGrid;
const AppDisplay = imports.ui.appDisplay;

const { appDisplay } = Main.overview._overview.controls;


class Extension {
	constructor() {
	}

	enable() {
		// more rows and columns in application overview grid
		this.originalGridModes = [...appDisplay._grid._gridModes];
		const gridCols = 10; // TODO: get from settings
		const gridRows = 4;
		appDisplay._grid._gridModes.push({
			columns: gridCols,
			rows: gridRows
		});
		appDisplay._grid._setGridMode(appDisplay._grid._gridModes.length - 1);

		// more rows and columns in application folder
		this.OriginalFolderGrid = AppDisplay.FolderGrid;
		const folderCols = 8; // TODO: get from settings
		const folderRows = 4;
		// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/appDisplay.js
		AppDisplay.FolderGrid = GObject.registerClass(
			class FolderGrid extends IconGrid.IconGrid {
				_init() {
					super._init({
						allow_incomplete_pages: false,
						columns_per_page: folderCols,
						rows_per_page: folderRows,
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
		appDisplay._grid._gridModes = this.originalGridModes;
		AppDisplay.FolderGrid = this.OriginalFolderGrid;
	}
}

// eslint-disable-next-line no-unused-vars
function init() {
	return new Extension();
}
