import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import Link from 'next/link';

import Masonry from 'components/Masonry';
import Ghost from 'containers/GhostBlog';

const breakpointColumnsObj = {
	default: 3,
	1100: 3,
	700: 2,
	500: 1,
};

const Blog: React.FC = () => {
	const { ghostInstance } = Ghost.useContainer();
	const [pageCount, setPageCount] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [ghostPosts, setGhostPosts] = useState<any[]>([]);

	const POST_PER_PAGE = 9;

	const getGhostPosts = useCallback(async () => {
		if (ghostInstance) {
			const posts = await ghostInstance?.posts.browse({ limit: POST_PER_PAGE, page: currentPage });
			const {
				pagination: { pages },
			} = posts.meta;
			setPageCount(pages);
			setGhostPosts(posts);
		} else {
			setPageCount(0);
			setGhostPosts([]);
		}
	}, [currentPage, ghostInstance]);

	useEffect(() => {
		if (ghostInstance) {
			getGhostPosts();
		}
	}, [ghostInstance, currentPage, getGhostPosts]);

	let handlePageClick = ({ selected }: { selected: number }) => {
		setCurrentPage(selected + 1);
	};

	return (
		<>
			<Head>
				<title>Blog | Synthetix Ambassadors</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
					crossOrigin="anonymous"
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
				></link>
			</Head>
			<Page>
				<>
					<div className="container blog-container">
						<Masonry
							breakpointCols={breakpointColumnsObj}
							className="my-masonry-grid"
							columnClassName="my-masonry-grid_column"
						>
							{ghostPosts.map((blog) => (
								<div className="grid-a" key={blog.id}>
									<Link href={'/blog/' + blog.id}>
										<div className="grid-item">
											<img className="featured-post-img" src={blog.feature_image} alt="img" />
											<p className="blog-date">{Moment(blog.created_at).format('D MMM yyyy')}</p>
											<h1 className="featured-blog-header-masonry">{blog.title}</h1>
											<p className="post-excerpt-masonry">{blog.excerpt}</p>
										</div>
									</Link>
								</div>
							))}
						</Masonry>
						<div className="pagination wrapper">
							<ReactPaginate
								containerClassName={'pagination'}
								previousClassName={'page-link'}
								nextClassName={'page-link'}
								breakLabel={'...'}
								breakClassName={'break-me'}
								pageClassName={'page-link'}
								activeClassName={'active'}
								pageCount={pageCount}
								marginPagesDisplayed={4}
								pageRangeDisplayed={4}
								onPageChange={(data) => handlePageClick(data)}
							/>
						</div>
					</div>
				</>
			</Page>
		</>
	);
};

export default Blog;

const Page = styled.div`
	padding-bottom: 24px;
`;
