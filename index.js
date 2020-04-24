const { BrowserWindow, app, globalShortcut, Menu, Tray } = require("electron");
const path = require("path")

let currentWin;
let tray = null
app.on('window-all-closed', e => e.preventDefault())
app.whenReady().then(() => {
	tray = new Tray(path.resolve(__dirname, "js16.png"));
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Exit', type: 'normal', click: () => { app.quit() } },
	])
	tray.setToolTip('js-this! is running - Copy and Cmd/Ctrl+Shift+J')
	tray.setContextMenu(contextMenu);
	tray.displayBalloon({
		icon: path.resolve(__dirname, "js.png"),
		iconType: "custom",
		title: "js-this! started",
		content: `Copy and CmdOrCtrl+Shift+J to manipulate`,
	});
	globalShortcut.register('CommandOrControl+Shift+J', () => {
		if (currentWin) {
			return;
		}
		currentWin = new BrowserWindow({
			alwaysOnTop: true,
			darkTheme: true,
			frame: false,
			transparent: true,
			webPreferences: {
				nodeIntegration: true,
			},
			show: false,
			height: 192,
		});
		currentWin.loadFile("index.html");
		currentWin.show();
		currentWin.on("closed", () => {
			currentWin = null;
		})
	});
	globalShortcut.register("Control+F12", () => {
		if (!currentWin) {
			return;
		}
		currentWin.webContents.openDevTools();
	})
})