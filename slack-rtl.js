function workWithStorageVal() {
  chrome.storage.sync.get(
    ["hebrew_font", "hebrew_font_size"],
    function (result) {
      var font = result["hebrew_font"];
      var font_size = result["hebrew_font_size"];
      var cl = $("body").attr("class").split(" ");
      var newcl = [];
      for (var i = 0; i < cl.length; i++) {
        r = cl[i].search(/hebrew_+/);
        if (r) newcl[newcl.length] = cl[i];
      }
      $("body")
        .removeClass()
        .addClass(newcl.join(" "))
        .addClass(font + " hebrew_font_size_" + font_size);
    }
  );
}
chrome.storage.onChanged.addListener((changes) => {
  for (let [hebrew_font] of Object.entries(changes)) {
    workWithStorageVal();
  }
});
jQuery(document).ready(function () {
  chrome.storage.sync.get(
    ["hebrew_font", "hebrew_font_size"],
    function (result) {
      var font = result["hebrew_font"];
      var font_size = result["hebrew_font_size"];
      $("body").addClass(font + " hebrew_font_size_" + font_size);
    }
  );
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var observer = new MutationObserver(function (mutations, observer) {
    let pattern = /[\u0590-\u05FF]/;
    function countWords(str) {
      return str
        .replace(/[$&+,:;=?@#"|'<>.^*()%!-]/gi, " ")
        .trim()
        .split(/\s+/).length;
    }
    $(".p-rich_text_block").each(function () {
      var str = $(this)
        .contents()
        .not($(".p-rich_text_section").children())
        .text();
      if (pattern.test(str)) {
        var str1 = str.replace(/[^!-~ЁёА-я\d\s]+/gi, " ");
        var str2 = str.replace(/[a-zA-ZЁёА-я]+/gi, " ");
        var $countEnglishWords = countWords(str1);
        var $countHebrewWords = countWords(str2);

        if ($countHebrewWords >= $countEnglishWords) {
          $(this).parents(".c-virtual_list__item").addClass("hebrew");
        } else {
          $(this).parents(".c-virtual_list__item").addClass("partofhebrew");
        }
      }
    });
    $(".ql-editor").each(function () {
      var str = $(this).text();
      if (pattern.test(str)) {
        $(this).addClass("hebrew");
        $(this)
          .parents(".c-search__input_box__container")
          .children(".c-basic_container__body")
          .css("flex-direction", "row-reverse")
          .addClass("hebrew");
      } else {
        $(this).removeClass("hebrew");
        $(this)
          .parents(".c-search__input_box__container")
          .children(".c-basic_container__body")
          .css("flex-direction", "inherit")
          .removeClass("hebrew");
      }
    });
    $(".c-message_attachment").each(function () {
      var str = $(this).text();
      if (pattern.test(str)) {
        var str1 = str.replace(/[^!-~ЁёА-я\d\s]+/gi, " ");
        var str2 = str.replace(/[a-zA-ZЁёА-я]+/gi, " ");
        var $countEnglishWords = countWords(str1);
        var $countHebrewWords = countWords(str2);

        if ($countHebrewWords >= $countEnglishWords) {
          $(this).addClass("hebrew");
        } else {
          $(this).addClass("partofhebrew");
        }
      }
    });
    $(".c-focus_manage_list__item").each(function () {
      var str = $(this).text();
      if (pattern.test(str)) {
        $(this).addClass("hebrew");
      }
    });
    $(".c-advanced_search_modal__keyword-input").each(function () {
      var str = $(this).val();
      if (pattern.test(str)) {
        $(this).addClass("hebrew");
      } else {
        $(this).removeClass("hebrew");
      }
    });
  });
  observer.observe(document, {
    subtree: true,
    attributes: true,
  });
});
