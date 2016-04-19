/**
 * Created by joey on 3/20/2016.
 */
LogoToSVG = function(){
    var currentFilename = '';
    var ns = {};
    var lastEditorValue = '';

    ns.loadCodeFromUrl = loadCodeFromUrl;
    ns.loadCode = loadCode;
    ns.dropboxChooserSuccessCallback = dropboxChooserSuccessCallback;
    ns.initAutosave = initAutosave;

    function init(){
        jQuery('#saveCodeToDropboxButton').click(saveCodeToDropbox);
        jQuery('#saveSVGToDropboxButton').click(saveSVGToDropbox);
    }

    jQuery(init);

    function initAutosave(){
        if(store.enabled && store.get('autosaved-code') != null){
            loadFromHistory();
        } else {
            loadCodeFromUrl('example.txt');
        }

        $(window).blur(function(){
            saveToHistory();
        });

        var autoSaveWithRestart = function(){
            saveToHistory();
            setTimeout(autoSaveWithRestart, 10000);
        }

        setTimeout(autoSaveWithRestart, 10000);
    }

    function saveCodeToDropbox(){
        var fileName = prompt("What would you like for the filename?", currentFilename);
        if(currentFilename == ''){
            currentFilename = fileName;
        }
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
        var svgFilename = currentFilename.slice(0, -4) + '.svg';
        var fileName = prompt("What would you like for the filename?", svgFilename);
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
        currentFilename = files[0].name;
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
        jQuery('[logo-action=draw]').click();
    }

    function loadFromHistory(){
        if(store.enabled){
            loadCode(store.get('autosaved-code'));
        }
    }

    function saveToHistory(){
        if(store.enabled && lastEditorValue != editor.getValue()){
            store.set('autosaved-code', editor.getValue());
            lastEditorValue = editor.getValue();
        }
    }

    return ns;
}();