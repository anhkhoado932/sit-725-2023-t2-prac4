const submitForm = () => {
  let formData = {};
  formData.title = $("#title").val();
  formData.subTitle = $("#subTitle").val();
  formData.path = $("#path").val();
  formData.description = $("#description").val();

  $.ajax({
    url: "/cat",
    type: "POST",
    data: formData,
    statusCode: {
      201: function () {
        $(".modal").modal("close");
        alert("cat added");
      },
    },
  });
};

const addCards = (items) => {
  items.forEach((item) => {
    let itemToAppend =
      '<div class="col s4 center-align">' +
      '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' +
      item.path +
      '">' +
      '</div><div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' +
      item.title +
      '<i class="material-icons right">more_vert</i></span><p><a href="#">' +
      item.subTitle +
      "</a></p></div>" +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' +
      item.subTitle +
      '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' +
      item.description +
      "</p>" +
      "</div></div></div>";
    $("#card-section").append(itemToAppend);
  });
};

const getAllCats = () => {
  $.get("/cat", (result) => {
    if (result.statusCode === 200) {
      addCards(result.data);
    }
  });
};

$(document).ready(function () {
  $(".materialboxed").materialbox();
  $(".modal").modal();
  $("#formSubmit").click(() => {
    submitForm();
  });
});
