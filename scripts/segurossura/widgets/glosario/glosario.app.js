function glossary(param) {
    var urls;
    var html = "";
    if (param == 'todos') {
        urls = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Glosario')/items?$top=1000&$orderby= Title asc ";
    } else {
        urls = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Glosario')/items?$filter=startswith(Title,'" + param + "')&$orderby= Title asc ";
    }
    $.ajax({
        //$filter=startswith(Title,'z')
        url: urls,
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Glosario')/items?$filter=startswith(Title,'*')",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function(data) {
            console.log(data.d.results)
            $.each(data.d.results, function(i, val) {
                //$("#glosario").append('<div class="content-center"><div><h3>' + val.Title + '</h3></div>' + '<div><p>' + val.Definici_x00f3_n + '</div></p></div><hr>');
                html = html + '<div class="content-center"><div><h3>' + val.Title + '</h3></div>' + '<div><p>' + val.Definici_x00f3_n + '</div></p></div><hr>'
            });
            if (html == "") {
                html = html + '<div class="content-center"><div><p>' + "No existen datos en esta categoría." + '</div></p></div><hr>'
            }
            $("#glosario").html(html);
        },
        error: function(data) {
            alert("Error: " + data);
        }
    });
};

function listar(param) {
    glossary(param)
};
$(document).ready(function() {
    glossary("todos")
});