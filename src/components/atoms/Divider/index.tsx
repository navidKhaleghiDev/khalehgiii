type PropsType = {
  vr?: boolean;
};
export function Divider({ vr }: PropsType) {
  return !vr ? (
    <hr
      style={{
        width: '100%',
        background: 'gray',
        height: '4px',
      }}
    />
  ) : (
    <div className="h-full bg-teal-600 w-0.5" />
  );
}
