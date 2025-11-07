export const DataFilterComponent = ({
	filterText,
	onFilter,
	onClear,
	placeholder = 'Filter By Name',
}) => (
	<div className="flex justify-end gap-2 w-full mx-auto">
		<div className="relative flex-grow max-w-sm">
			<input
				id="search"
				type="text"
				placeholder={placeholder}
				aria-label="Search Input"
				value={filterText}
				onChange={onFilter}
				className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 
				shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none 
				transition duration-200"
			/>
			<svg
				className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</div>

		<button
			type="button"
			onClick={onClear}
			className="flex items-center justify-center rounded-lg bg-red-500 text-white text-sm 
			px-3 py-2 font-medium shadow-sm hover:bg-red-600 active:bg-red-700 transition duration-200"
		>
			Clear
		</button>
	</div>
);
