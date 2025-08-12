import { styled } from 'styled-components';

const Heading = styled.h1`
  color: #222224;
  font-family: Outfit;
  font-size: 28px;
  font-weight: 500;
`;

function MainContentArticle({ children, title }) {
  return (
    // <div className="ml-7 my-10 md:w-[60%]">
    <div className="md:p-7 my-10 col-span-2">
      <div className="py-3 ">
        <Heading>{title}</Heading>
      </div>
      <div className="mb-10">
        {children
          ? children
          : Array.from({ length: 10 }, (_, i) => (
              <p className="my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati illo quod, ut nobis eius deserunt deleniti doloremque
                eos dicta fugiat incidunt commodi voluptatum eaque adipisci
                minus dolores hic dolorem voluptates?
              </p>
            ))}
      </div>
    </div>
  );
}

export default MainContentArticle;
