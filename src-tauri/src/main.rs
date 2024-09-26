// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::PathBuf;
use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu};
use tauri_plugin_positioner::{Position, WindowExt};
use tauri_plugin_sql;
use window_shadows::set_shadow;
use window_vibrancy::apply_acrylic;

#[tauri::command]
fn open_file_system(path: &str) -> Result<(), String> {
    let path_buf: PathBuf = PathBuf::from(path);

    match open::that(path_buf) {
        Ok(_) => Ok(()),
        Err(_) => Err("Failed to open the file".to_string()),
    }
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Sair do Wildtray");
    let system_tray_menu = SystemTrayMenu::new().add_item(quit);

    tauri::Builder::default()
        .setup(|app| {
            let window: tauri::Window = app.get_window("main").unwrap();

            #[cfg(target_os = "windows")]
            apply_acrylic(&window, Some((0, 0, 0, 10))).unwrap();

            // Focus the main window on startup
            window.set_focus().unwrap();

            app.listen_global("quit", |_| {
                std::process::exit(0);
            });

            Ok(())
        })
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .system_tray(
            SystemTray::new()
                .with_menu(system_tray_menu)
                .with_tooltip("WildTray"),
        )
        .invoke_handler(tauri::generate_handler![open_file_system])
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                SystemTrayEvent::LeftClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    let window: tauri::Window = app.get_window("main").unwrap();

                    #[cfg(any(windows, target_os = "macos"))]
                    set_shadow(&window, true).unwrap();

                    window.move_window(Position::TrayCenter).unwrap();
                    window.set_skip_taskbar(true).unwrap();
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
                SystemTrayEvent::DoubleClick { .. } => {}
                SystemTrayEvent::RightClick { .. } => {}
                _ => todo!(),
            }
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::Focused(focused) => {
                if !focused {
                    event.window().hide().unwrap();
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
