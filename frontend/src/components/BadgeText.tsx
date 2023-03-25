type BadgeTextProps = { label: any; count: number };
const BadgeText = ({ label, count }: BadgeTextProps) => {
  const isNonZeroCount = count !== 0;
  return (
    <div style={{ position: 'relative' }}>
      <div className='label'>{label}</div>
      {isNonZeroCount && <div className='count'>{count}</div>}
    </div>
  );
};

export default BadgeText;
