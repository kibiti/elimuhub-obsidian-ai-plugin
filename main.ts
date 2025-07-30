import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from "obsidian";

interface SamplePluginSettings {
  mySetting: string;
}

const DEFAULT_SETTINGS: SamplePluginSettings = {
  mySetting: "default"
};

export default class SamplePlugin extends Plugin {
  settings: SamplePluginSettings;

  async onload() {
    await this.loadSettings();

    // Ribbon Icon
    this.addRibbonIcon("dice", "Sample Plugin", () => {
      new Notice("This is a notice from the sample plugin!");
    });

    // Command
    this.addCommand({
      id: "open-sample-modal",
      name: "Open Sample Modal",
      callback: () => {
        new SampleModal(this.app).open();
      }
    });

    // Settings Tab
    this.addSettingTab(new SampleSettingTab(this.app, this));

    // Global Click Event
    this.registerDomEvent(document, "click", () => {
      console.log("click");
    });

    // Global Interval
    this.registerInterval(window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class SampleModal extends Modal {
  constructor(app: App) {
    super(app);
  }

  onOpen() {
    this.contentEl.setText("Wow! This is a modal window");
  }

  onClose() {
    this.contentEl.empty();
  }
}

class SampleSettingTab extends PluginSettingTab {
  plugin: SamplePlugin;

  constructor(app: App, plugin: SamplePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "Settings for Sample Plugin." });

    new Setting(containerEl)
      .setName("Setting #1")
      .setDesc("It's a secret")
      .addText(text =>
        text
          .setPlaceholder("Enter your secret")
          .setValue(this.plugin.settings.mySetting)
          .onChange(async (value) => {
            this.plugin.settings.mySetting = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
