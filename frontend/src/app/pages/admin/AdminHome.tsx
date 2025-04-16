import Page from '@/components/page/Page';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function AdminHome() {
  const [text, setText] = useState("")
  console.log(text)


  return (
    <Page title={'Admin dashboard'}>


      <div contentEditable className='markdown max-w-[350px] outline min-h-[250px] p-5 overflow-y-scroll' onInput={e=>setText(e.target.innerHTML)}>
        
      </div>

      <div className='markdown'>
      <ReactMarkdown  remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {text}
      </ReactMarkdown>
      </div>

    </Page>
  );
}
