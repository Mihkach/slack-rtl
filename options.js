document.addEventListener("DOMContentLoaded", function (event) {
  let nodes = document.querySelectorAll(".quantity");
  for (let i = 0; i < nodes.length; i++) {
    var input = nodes[i].querySelector('input[type="number"]');
    var btnUp = nodes[i].querySelector(".quantity-up");
    var btnDown = nodes[i].querySelector(".quantity-down");
    var min = input.getAttribute("min");
    var max = input.getAttribute("max");

    btnUp.addEventListener("click", function () {
      console.log("btnUp");
      var oldValue = parseFloat(input.value);
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }
      input.value = newVal;

      var event = new Event("change");
      input.dispatchEvent(event);
    });

    btnDown.addEventListener("click", function () {
      console.log("btnDown");
      var oldValue = parseFloat(input.value);
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      input.value = newVal;

      var event = new Event("change");
      input.dispatchEvent(event);
    });
  }
});

function restore_options() {
  chrome.storage.sync.get(
    ["hebrew_font", "hebrew_font_size"],
    function (result) {
      var font = result["hebrew_font"];
      var size = result["hebrew_font_size"];
      console.log(font);
      console.log(size);
      if (size == null) {
        chrome.storage.sync.set({
          hebrew_font_size: 16,
        });
      } else {
        document.getElementById("hebrew_font_size").value = size;
      }
      if (font == null) {
        chrome.storage.sync.set({
          hebrew_font: "hebrew_noto",
        });
        document.getElementById("hebrew_noto").checked = true;
      } else {
        switch (font) {
          case "hebrew_noto":
            document.getElementById("hebrew_noto").checked = true;
            break;
          case "hebrew_alef":
            document.getElementById("hebrew_alef").checked = true;
            break;
          case "hebrew_open":
            document.getElementById("hebrew_open").checked = true;
            break;
          case "hebrew_rubik":
            document.getElementById("hebrew_rubik").checked = true;
            break;
          case "hebrew_frank":
            document.getElementById("hebrew_frank").checked = true;
            break;
          case "hebrew_noto_serif":
            document.getElementById("hebrew_noto_serif").checked = true;
            break;
          case "hebrew_david":
            document.getElementById("hebrew_david").checked = true;
            break;
        }
      }
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);

var elements = document.getElementsByClassName("quantity-button");
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", function () {
    setTimeout(function () {
      var size = document.getElementById("hebrew_font_size").value;
      chrome.storage.sync.set({
        hebrew_font_size: size,
      });
    }, 200);
  });
}

if (document.querySelector('input[name="hebrew_font"]')) {
  document.querySelectorAll('input[name="hebrew_font"]').forEach((elem) => {
    elem.addEventListener("change", function (event) {
      var font = event.srcElement.id;
      chrome.storage.sync.set({
        hebrew_font: font,
      });
    });
  });
}
