export const ComponentCell = ({ row, id, head }: any) => {
	const Component = head?.component;
	if (!Component) {
		return null;
	}

	return <Component row={row} id={id} head={head} size={head?.size} />;
};
