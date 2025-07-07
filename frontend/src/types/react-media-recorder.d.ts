declare module 'react-media-recorder' {
  export interface MediaRecorderProps {
    audio?: boolean;
    render: (props: { status: string; startRecording: () => void; stopRecording: () => void; mediaBlobUrl: string | null; }) => React.ReactElement;
  }
  export const ReactMediaRecorder: React.FC<MediaRecorderProps>;
}