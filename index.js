var audioTimestamp;
(function (audioTimestamp) {
    audioTimestamp.player;
    audioTimestamp.playerQuery = function () {
        return $('#wrapper > audio');
    };

    audioTimestamp.timestampQuery = function () {
        return $('#timestamp');
    };
    audioTimestamp.fileQuery = function () {
        return $('#file');
    };

    audioTimestamp.currentFile;
    audioTimestamp.timestamp;

    $(function () {
        var query = audioTimestamp.playerQuery();
        audioTimestamp.player = query[0];

        $('#timestamp-pause').click(function () {
            if (audioTimestamp.player.paused) {
                audioTimestamp.player.play();
                $('#timestamp-pause > span').addClass('glyphicon-pause').removeClass('glyphicon-play');
            } else {
                audioTimestamp.player.pause();
                $('#timestamp-pause > span').removeClass('glyphicon-pause').addClass('glyphicon-play');
            }
        });

        query.on('timeupdate', function () {
            update(audioTimestamp.currentFile, audioTimestamp.timestamp = audioTimestamp.player.currentTime);
        });

        $('#timestamp-go').click(function () {
            play(audioTimestamp.currentFile = audioTimestamp.fileQuery().val(), parseFloat(audioTimestamp.timestampQuery().val() || '0'));
        });

        $('#output-copy').on('mouseleave', function () {
            return $('#output-copy').tooltip('hide');
        });

        audioTimestamp.currentFile = getParameterByName('file');
        if (audioTimestamp.currentFile) {
            console.log('Loading file:', audioTimestamp.currentFile);
            audioTimestamp.fileQuery().attr('value', audioTimestamp.currentFile);
        } else
            console.log('No file supplied');
        audioTimestamp.timestamp = 0;
        try  {
            audioTimestamp.timestamp = parseFloat(getParameterByName('time'));
            if (Number['isNan'](audioTimestamp.timestamp))
                audioTimestamp.timestamp = 0;
            $('#timestamp').attr('value', audioTimestamp.timestamp);
            $('#timestamp-current').text('Current: ' + audioTimestamp.timestamp);
            $('#timestamp').attr('value', audioTimestamp.timestamp);
        } catch (ex) {
        }

        if (audioTimestamp.currentFile)
            play(audioTimestamp.currentFile, audioTimestamp.timestamp);
    });

    function update(file, timestamp) {
        $('#output').attr('value', location['origin'] + location.pathname + '?file=' + file + '&time=' + timestamp);
        $('#timestamp-current').text('Current: ' + timestamp);
    }
    audioTimestamp.update = update;

    function play(file, timestamp) {
        if (typeof timestamp === "undefined") { timestamp = 0; }
        audioTimestamp.currentFile = file;
        audioTimestamp.player.pause();
        var query = audioTimestamp.playerQuery();
        query.children('source').remove();
        query.append($('<source/>').attr('src', file));
        audioTimestamp.player.sourceIndex = 0;
        audioTimestamp.player.currentTime = timestamp;
        audioTimestamp.player.play();
    }
    audioTimestamp.play = play;

    //http://stackoverflow.com/a/901144
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
})(audioTimestamp || (audioTimestamp = {}));
//# sourceMappingURL=index.js.map
