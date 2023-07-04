import { Container } from "@chakra-ui/layout";
import PageHeader from "../PageHeader";
import Head from "next/head";
import { searchAlgolia } from "../../lib/algolia";
import { useState } from 'react';
import { Link} from '@chakra-ui/react'

export default function Search({ view }) {
  const [searcResult, setSearcResult] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    const searchTerm = event.target.elements.searchTerm.value;  

    if(searchTerm.length === 0) {
      setSearcResult({});
      return;
    }

    const searcResults = await searchAlgolia(searchTerm);
    setSearcResult(searcResults);
  }

  return (
    <>
      <Head>
        <title>{view.headline}</title>
        <meta name="description" content={view.seoMetaDescription} />
      </Head>
      <PageHeader title={view.headline} />
      
      <Container 
        maxW="container.lg"
        style={{
          textAlign: "center",
          marginBottom: "20px"
        }}>
        <form onSubmit={handleSubmit}>
          <input type="search" name="searchTerm" placeholder="Search..." style={{
            borderRadius: "25px",
            fontSize: "20px",
            padding: "10px 20px 10px 20px",
            color: "gray",
            marginTop: "20px"
          }} />
        </form>
        
        {searcResult.query?.length > 0 &&
          <>
            {searcResult.hits?.length === 0 &&
              <div style={{ margin: "20px"}}>
                <i>The search on <strong>{searcResult.query}</strong> returned no results</i>
              </div>
            }
            {searcResult.hits?.length > 0 &&
              <div style={{ margin: "20px"}}>
                <i>The search on <strong>{searcResult.query}</strong> returned <strong>{searcResult.nbHits}</strong> {searcResult.hits?.length > 1 ? "results" : "result"}</i>
              </div>
            }
            {searcResult.hits?.map((p, index) => {
              return <div key={index} style={{ textAlign: "left", margin: "10px 0 10px 0", paddingBottom: "5px", borderBottom: "1px dashed var(--chakra-colors-orange-400)"}}>
                <Link
                  href={p.href}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  {p.type === 'post' &&
                    <>
                      <strong>{p.title}</strong> - <i style={{ fontSize: "90%"}}>Type: {p.type}</i><br/>
                      {p.teaser} 
                    </>
                  }
                  {p.type === 'contentPage' &&
                    <>
                      <strong>{p.headline}</strong> - <i style={{ fontSize: "90%"}}>Type: {p.type}</i><br/>
                      {p.blocks.find(block => block.alias === 'blockText')?.text.replace(/(<([^>]+)>)/gi, "").substring(0, 200)}...
                    </>
                  }
                </Link>
              </div>
            })}
          </>
        }
      </Container>
    </>
  );
}
