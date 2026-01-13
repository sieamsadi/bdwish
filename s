<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audio Player</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #1a1a1a;
        }
        /* This container holds only the player */
        .player-wrapper {
            background: #2d2d2d;
            padding: 1.5rem;
            border-radius: 50px; /* Rounded pill shape */
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        /* Standard audio player styling */
        audio {
            height: 40px;
        }
    </style>
</head>
<body>

    <div class="player-wrapper">
        <audio controls>
            <source src="morse.wav" type="audio/wav">
            Your browser does not support the audio element.
        </audio>
    </div>

</body>
</html>
