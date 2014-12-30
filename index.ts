module audioTimestamp {
    export var player: HTMLAudioElement;
    export var playerQuery = () => $('#wrapper > audio');

    export var timestampQuery = () => $('#timestamp');
    export var fileQuery = () => $('#file');

    export var currentFile;
    export var timestamp;

    $(() => {
        var query = playerQuery();
        player = <any>query[0];

        $('#timestamp-pause').click(() => {
            if (player.paused) {
                player.play();
                $('#timestamp-pause > span').addClass('glyphicon-pause').removeClass('glyphicon-play');
            } else {
                player.pause();
                $('#timestamp-pause > span').removeClass('glyphicon-pause').addClass('glyphicon-play');
            }
        });

        query.on('timeupdate', () => {
            update(currentFile, timestamp = player.currentTime);
        });

        $('#timestamp-go').click(() => {
            play(currentFile = fileQuery().val(), parseFloat(timestampQuery().val() ||'0'));
        });

        $('#output-copy').on('mouseleave', () => $('#output-copy').tooltip('hide'));

        currentFile = getParameterByName('file');
        if (currentFile) {
            console.log('Loading file:', currentFile);
            fileQuery().attr('value', currentFile);
        }
        else console.log('No file supplied');
        timestamp = 0;
        try {
        timestamp = parseFloat(getParameterByName('time'));
            if (Number['isNan'](timestamp))timestamp = 0;
            $('#timestamp').attr('value', timestamp);
            $('#timestamp-current').text('Current: ' + timestamp);
                $('#timestamp').attr('value', timestamp);
            } catch (ex) {}

        if (currentFile) play(currentFile, timestamp);
    });

    export function update(file: string, timestamp: number) {
        $('#output').attr('value', location['origin'] + location.pathname + '?file=' + file + '&time=' + timestamp);
        $('#timestamp-current').text('Current: ' + timestamp);
    }

    export function play(file: string, timestamp: number = 0) {
        currentFile = file;
        player.pause();
        var query = playerQuery();
        query.children('source').remove();
        query.append($('<source/>').attr('src', file));
        player.sourceIndex = 0;
        player.currentTime = timestamp;
        player.play();
    }

    //http://stackoverflow.com/a/901144
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}