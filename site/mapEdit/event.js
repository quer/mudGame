var selectedChar = "#";
var selecedColor = "green";
$("#charAjax div").click(function () {
    selectedChar = $(this).text();
});
$("#colorAjax div").click(function () {
    selecedColor = $(this).text();
});
$("#map div").click(function () {
    $(this).text(selectedChar);
    $(this).attr("class", selecedColor);
});