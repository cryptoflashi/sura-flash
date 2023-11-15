var optios = "";

function fillPage(param) {
    var urls;
    var html = "";
    if (param == 'select') {
        urls = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('FAQs')/items?$top=1000&select=Title&$orderby= Title asc";
    } else if (param == 'all') {
        urls = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('FAQs')/items?$top=1000&$orderby= Title asc ";
    } else {
        param = document.getElementById('selectItem').value;
        if (param == 'Todas') {
            fillPage("all")
        }
        urls = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('FAQs')/items?$filter=startswith(Title,'" + param + "')&$orderby= Title asc ";
    }
    $.ajax({
        url: urls,
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function(data) {
            console.log(data.d.results)
            if (param == 'select') {
                //CARGA EL COMBO
                options = groupBy(data.d.results, "Title");
                $.each(options, function(i, p) {
                    $('#selectItem').append($('<option></option>').val(p).html(p));
                });
            } else {
                // LLENA EL HTML CON LAS PREGUNTAS
                $.each(data.d.results, function(i, val) {
                    html = html + '<div class="content-center"><div class="col-md-12"><div><h3>' + val.T_x00ed_tulo1 + '</h3></div>' + '<div><p>' + val.Respuesta + '</div></p></div></div><hr>'
                });
                $("#faq").html(html);
            }
        },
        error: function(data) {
            alert("Error: " + data);
        }
    });
};

function groupBy(items, propertyName) {
    var result = [];
    $.each(items, function(index, item) {
        if ($.inArray(item[propertyName], result) == -1) {
            result.push(item[propertyName]);
        }
    });
    return result;
}
$(document).ready(function() {
    fillPage("select");
    fillPage("all");
});