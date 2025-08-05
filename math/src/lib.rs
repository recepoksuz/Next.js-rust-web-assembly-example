use wasm_bindgen::prelude::*;

// Import the `console.log` function from the Web API
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// Define a macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! console_log {
    ( $( $t:tt )* ) => {
        log(&format!( $( $t )* ))
    }
}

// Export a `greet` function from Rust to JavaScript, that alerts a hello message.
#[wasm_bindgen]
pub fn greet(name: &str) {
    console_log!("Hello, {}!", name);
}

// Export math functions to JavaScript
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn sub(a: i32, b: i32) -> i32 {
    a - b
}

#[wasm_bindgen]
pub fn mul(a: i32, b: i32) -> i32 {
    a * b
}

#[wasm_bindgen]
pub fn div(a: i32, b: i32) -> i32 {
    if b == 0 {
        console_log!("Warning: Division by zero!");
        return 0;
    }
    a / b
}

#[wasm_bindgen]
pub fn mod_op(a: i32, b: i32) -> i32 {
    if b == 0 {
        console_log!("Warning: Modulus by zero!");
        return 0;
    }
    a % b
}
