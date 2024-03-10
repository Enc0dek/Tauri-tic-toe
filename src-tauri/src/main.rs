// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#[tauri::command]
fn check(map:Vec<Vec<i32>>) -> i16{
    let mut winner = 2;
    for row in map.iter(){
        if row[0] == 1 && row[1] == 1 && row[2] == 1{
            winner = 1;
        }else if row[0] == 0 && row[1] == 0 && row[2] == 0 {
            winner = 0;
        }
    }

    for col in 0..map.len(){
        if map[0][col] == 1 && map[1][col] == 1 && map[2][col] == 1 || map[0][2] == 1 && map[1][1] == 1 && map[2][0] == 1{
            winner = 1;
        }else if map[0][col] == 0 && map[1][col] == 0 && map[2][col] == 0 || map[0][2] == 0 && map[1][1] == 0 && map[2][0] == 0{
            winner = 0;
        }
    }

    if map[0][0] == 1 && map[1][1] == 1 && map[2][2] == 1{
        winner = 1;
    }else if map[0][0] == 0 && map[1][1] == 0 && map[2][2] == 0 {
        winner = 0;
    }

    return winner;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![check])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
