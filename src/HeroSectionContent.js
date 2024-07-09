export const HeroSectionContent = ({info}) => {
	console.log(info)
	return (
		<div className="section-content">
			<span className="section-title">
				{info.id === 0 ? 'Scroll over me...': ''}
			</span>
			{info.info ?
				<>
					<span className="section-description">{info.author}</span>
					<span className="section-description">{info?.url}</span>
				</> : null}

		</div>
	)
}
