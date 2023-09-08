

export const FormPreviewSettings = {
    "components": [
      {
        "label": "HTML",
        "attrs": [
          {
            "attr": "",
            "value": ""
          }
        ],
        "content": "Test your form using an Instance of a Work-Type.\n",
        "refreshOnChange": false,
        "key": "html",
        "type": "htmlelement",
        "input": false,
        "tableView": false
      },
      {
        "label": "ShareDo ID ",
        "applyMaskOn": "change",
        "tableView": true,
        "key": "shareDoId",
        "type": "textfield",
        "input": true
      },
      {
        "type": "button",
        "label": "Submit",
        "key": "submit",
        "disableOnInvalid": true,
        "input": true,
        "tableView": false
      }
    ]
  }