export default {
  "local_mocha": {
    "visible": true,
    "type": "boolean",
    "description": "Run test via magellan-mocha-plugin "
    + "(exclusive with list_browser and list_browsers)"
  },
  "local_browser": {
    "visible": true,
    "type": "string",
    "example": "browsername",
    "description": "Run tests in chrome, firefox, etc (default: phantomjs)."
  },
  "local_browsers": {
    "visible": true,
    "type": "string",
    "example": "b1,b2,..",
    "description": "Run multiple browsers in parallel."
  },
  "local_list_browsers": {
    "visible": true,
    "type": "function",
    "description": "List the available browsers configured."
  }
};
