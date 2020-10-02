$(function() {

    function saveTextAsFile(textToWrite, fileNameToSaveAs) {
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        }
         
        downloadLink.click();
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('');
    }

    $(".close").on("click", function() {
        $('#csr').val('');
        $('#private_key').val('');
        $(this).closest(".modal").removeClass("active");
    });

    $("form").submit(function(e) {
        e.preventDefault();

        $.post("/generate", $(this).serialize(), function(data) {
            console.log(data);
            $("#csr").val(data.csr);
            $("#private_key").val(data.private_key);

        }, "json");

        $("#csr-modal").addClass("active");
    });

    $("#csr").on("click focus", function() { this.select() } );
    $("#private_key").on("click focus", function() { this.select() } );


    $("#btn_download_csr").click(function() {
        var strdate = formatDate(new Date());
        var filename = $("input[name=CN]").val()+strdate+".csr";
        saveTextAsFile($('#csr').val(),filename);
    });
    $("#btn_download_privatekey").click(function() {
        var strdate = formatDate(new Date());
        var filename = $("input[name=CN]").val()+strdate+".key";
        saveTextAsFile($('#private_key').val(),filename);
    });      

});


