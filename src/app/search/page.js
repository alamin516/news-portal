import PlainLayout from '@/components/master/PlainLayout'
import NewsList from '@/components/news/NewsList';
import PopularList from '@/components/news/PopularList';
import React from 'react'
import { Alert } from 'react-bootstrap';

async function getData(keyword){
  let news = (
    await (
      await fetch(`${process.env.HOST}/api/news/search?keyword=${keyword}`)
    ).json()
  )["data"];
  let Popular = (
    await (await fetch(`${process.env.HOST}/api/news/type?type=Popular`)).json()
  )["data"];
  return { news: news, Popular: Popular };

}

const page = async({searchParams}) => {
  const keyword = searchParams['keyword'];
  const data = await getData(keyword)

  return (
    <PlainLayout>
         <div className="container mt-4">
        <div className="row">
          <div className="col-md-9 col-lg-9 col-sm-12 col-12 px-3">
            {data["news"]?.length > 0 ? (
              <NewsList latest={data["news"]} />
            ) : (
              <div className="d-flex justify-content-center justify-items-center">
                <Alert variant="warning" className="mt-3">
              No posts found
            </Alert>
              </div>
            )}
          </div>
          <div className="col-md-3 col-lg-3 col-sm-12 col-12 px-3">
            <PopularList popular={data["Popular"]} />
          </div>
        </div>
      </div>
    </PlainLayout>
  )
}

export default page