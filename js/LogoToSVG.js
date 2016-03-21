/**
 * Created by joey on 3/20/2016.
 */
LogoToSVG = function(){
    var ns = {};
    ns.loadCodeFromUrl = loadCodeFromUrl;
    ns.loadCode = loadCode;
    ns.dropboxChooserSuccessCallback = dropboxChooserSuccessCallback;

    function init(){
        jQuery('#saveCodeToDropboxButton').click(saveCodeToDropbox);
        jQuery('#saveSVGToDropboxButton').click(saveSVGToDropbox);
        loadCodeFromUrl('example.txt');
    }

    jQuery(init);

    function saveCodeToDropbox(){
        var fileName = prompt("What would you like for the filename?");
        if(fileName != null){
            var options = {
                files: [
                    {'url': 'data:text/plain;base64,' + btoa(editor.getValue()), 'filename': fileName}
                ],
                success: function () {
                    setStatusOnDropboxButton(jQuery('#saveCodeToDropboxButton'), 'success');
                }
            }
            Dropbox.save(options);
        }
        return false;
    }


    function saveSVGToDropbox(){
        var fileName = prompt("What would you like for the filename?");
        if(fileName != null) {
            var options = {
                files: [
                    {'url': jQuery('#svgLink').attr('href'), 'filename': fileName}
                ],
                success: function () {
                    setStatusOnDropboxButton(jQuery('#saveSVGToDropboxButton'), 'success');
                }
            }

            Dropbox.save(options);
        }
        return false;
    }

    function setStatusOnDropboxButton($button, status){
        $button.removeClass('dropbox-dropin-success');
        $button.addClass("dropbox-dropin-" + status);
    }

    function dropboxChooserSuccessCallback(files){
        loadCodeFromUrl(files[0].link);
    }

    function loadCodeFromUrl(url){
        jQuery.ajax({
            url: url,
            success: loadCode,
            dataType: 'text'
        })
    }

    function loadCode(code){
        editor.setValue(code);
    }

    return ns;
}();