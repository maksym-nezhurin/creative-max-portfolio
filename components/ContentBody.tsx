import { Content } from '@prismicio/client';
import Bounded from './Bounded';
import Heading from './Heading';
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { DateField, isFilled } from '@prismicio/client';

export default function ContentBody({
	page
}: {
	page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
	function formatDate(date: DateField) {
		if(isFilled.date(date)) {
			const dateOptions: Intl.DateTimeFormatOptions = {
				weekday: 'long',
				year: "numeric",
				month: "long",
				day: "numeric"
			}

			return new Intl.DateTimeFormat("en-US", dateOptions).format(
				new Date(date)
			)
		}
	}
	
	const formatedDate = formatDate(page.data.date);

	return (
		<Bounded as="article">
		<div className='rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20'>
			<Heading as="h1">{page.data.title}</Heading>

			<div className="flex gap-4 text-yellow-400 text-xl font-bold">
				{
					page.tags.map((tag) => {
						return <span key={tag}>{tag}</span>	
					})
				}
			</div>
			<p className='mt-8 border-b border-slate-600 text-xl font-medium text-slate-300'>{formatedDate}</p>
			<div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
				<SliceZone slices={page.data.slices} components={components} />
			</div>
			
		</div>
	</Bounded>
	)
}