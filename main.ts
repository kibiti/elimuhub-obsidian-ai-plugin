import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from "obsidian";

interface ElimuhubPluginSettings {
  mySetting: string;
}

const DEFAULT_SETTINGS: ElimuhubPluginSettings = {
  mySetting: "default"
};

export default class ElimuhubPlugin extends Plugin {
  settings: ElimuhubPluginSettings;

  async onload() {
    await this.loadSettings();

    // Ribbon Icon
    this.addRibbonIcon("graduation-cap", "Elimuhub AI Plugin", () => {
      new Notice("Welcome to Elimuhub's AI-powered learning tools!");
    });

    // Command Examples
    this.addCommand({
      id: "open-sample-modal",
      name: "Open Sample Modal",
      callback: () => {
        new ElimuhubModal(this.app).open();
      }
    });

    // Settings Tab
    this.addSettingTab(new ElimuhubSettingTab(this.app, this));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class ElimuhubModal extends Modal {
  constructor(app: App) {
    super(app);
  }
  onOpen() {
    this.contentEl.setText("Welcome to Elimuhub's AI tools for educators and parents!");
  }
  onClose() {
    this.contentEl.empty();
  }
}

class ElimuhubSettingTab extends PluginSettingTab {
  plugin: ElimuhubPlugin;

  constructor(app: App, plugin: ElimuhubPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Elimuhub AI Plugin Settings" });
    new Setting(containerEl)
      .setName("Setting #1")
      .setDesc("Custom setting for Elimuhub plugin")
      .addText(text =>
        text
          .setPlaceholder("Enter value")
          .setValue(this.plugin.settings.mySetting)
          .onChange(async (value) => {
            this.plugin.settings.mySetting = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
