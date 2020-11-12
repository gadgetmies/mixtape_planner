import Tracklist from './Tracklist'

export default function TracklistEditor({ tracks, tracklist, setTracklist }) {
  return (
    <div>
      <textarea className="tracklist" onChange={(e) => setTracklist(e.target.value)} defaultValue={tracklist} />
      <Tracklist tracks={tracks} />
    </div>
  )
}
