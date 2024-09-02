#!/usr/bin/osascript

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Open current Soptify track in YouTube
# @raycast.mode silent

# Optional parameters:
# @raycast.icon images/spotify-logo.png
# @raycast.packageName Spotify

# Documentation:
# @raycast.description Opens the currently playing Spotify track in YouTube

tell application "Spotify"
  set currentTrack to name of current track
  set currentArtist to artist of current track
end tell
set query to currentArtist & " " & currentTrack
do shell script "open 'https://www.youtube.com/results?search_query='" & quoted form of query
