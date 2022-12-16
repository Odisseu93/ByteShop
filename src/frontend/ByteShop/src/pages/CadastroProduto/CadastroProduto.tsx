import React from "react";
import { useRef, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DropdownSelector } from "../../components/categorias/DropdownSelector";
import { Category } from "../../services/api/Category";

const CadastroProduto: React.FC = () => {
  // hooks
  const [validated, setValidated] = useState(false);
  const [categoryCurrentID, setCategoryCurrentID] = useState(0);

  interface IImgsJson {
    id?: string;
    imageBase64: string;
    extension: string;
  }

  type TImgSrc = string | ArrayBuffer | IImgsJson | null | any;

  const [imgSrc, setImgSrc] = useState<TImgSrc[]>([]);
  const [images, setImages] = useState<JSX.Element[] | Element[] | null>([]);
  const [imagesIsInvalid, setImagesIsInvalid] = useState(false);
  const [renderImages, setRenderImages] = useState(false);

  // refs
  const skuRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const brandRef = useRef<HTMLInputElement>(null);
  const warrantyRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const lengthRef = useRef<HTMLInputElement>(null);
  const widthRef = useRef<HTMLInputElement>(null);
  const heigthRef = useRef<HTMLInputElement>(null);
  const weigthRef = useRef<HTMLInputElement>(null);
  const costPriceRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const stockRef = useRef<HTMLInputElement>(null);
  const refImages = useRef<HTMLInputElement>(null);

  // handlers
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    const mainImageBase64: IImgsJson = {
      imageBase64: imgSrc[0]?.imageBase64,
      extension: imgSrc[0]?.type,
    };

    let secondaryImagesBase64: IImgsJson[] = [];

    for (let i = 1; i < imgSrc.length; i++) {
      secondaryImagesBase64.push({
        imageBase64: imgSrc[i]?.imageBase64,
        extension: imgSrc[i].type,
      });
    }

    console.table(
      JSON.stringify({
        sku: skuRef.current?.value,
        name: nameRef.current?.value,
        brand: brandRef.current?.value,
        categoryID: Number(categoryCurrentID),
        warranty: warrantyRef.current?.value,
        description: descriptionRef.current?.value,
        length: Number(lengthRef.current?.value),
        width: Number(widthRef.current?.value),
        heigth: Number(heigthRef.current?.value),
        weigth: Number(weigthRef.current?.value),
        costPrice: costPriceRef.current?.value,
        price: priceRef.current?.value,
        stock: stockRef.current?.value,
        mainImageBase64,
        secondaryImagesBase64,
      })
    );

    setValidated(true);
    return;
  }

  function handleCancel() {
    voltar("/");
    return;
  }

  function handleImagesInput(e: React.RefObject<HTMLInputElement>) {
    const files = e.current!.files;
    let arr: Array<TImgSrc> = [];

    if (files) {
      // console.log(files);
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        //limitando o tamanho das imagens(350KB)
        if (
          Number((files[i].size / 1024).toFixed(2)) <= 350 &&
          imgSrc.length < 5
        ) {
          reader.readAsDataURL(files[i]);
          reader.onload = () =>
            setImgSrc([
              ...imgSrc,
              {
                id: new Date()[Symbol.toPrimitive]("number").toString(),
                imageBase64: reader.result,
                extension: files[i].type,
              },
            ]);
          setImagesIsInvalid(false);
        } else if (Number((files[i].size / 1024).toFixed(2)) >= 350) {
          alert("foto maior que 350KB");
          setImagesIsInvalid(true);
        } else if (imgSrc.length === 5) alert("limite de imagens atingido!");
      }
    }
  }

  const voltar = useNavigate();

  Category.getAll();

  return (
    <>
      <Container className="p-3 d-flex flex-column m-0" fluid>
        <Breadcrumb className="align-self-center">
          <BreadcrumbItem href="/">Início</BreadcrumbItem>
          <BreadcrumbItem href="/cadastro-de-produtos" active>
            Cadastrar Produtos
          </BreadcrumbItem>
        </Breadcrumb>
        <Form
          noValidate
          className="w-75 d-flex p-5 align-self-center form-cadastro-produto"
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Col>
            <Row className="mb-4">
              {/* sku */}
              <FormGroup className="me-5" style={{ width: "19.56rem" }}>
                <FormLabel htmlFor="sku">SKU</FormLabel>
                <FormControl
                  type="text"
                  ref={skuRef}
                  placeholder="SKU"
                  title="insira aqui o SKU do produto"
                  id="sku"
                />
                <FormText className="text-muted ms-2 p-1">
                  Ex: ssd480-king
                </FormText>
              </FormGroup>
              {/*  */}
              {/* name */}
              <FormGroup className="me-5" style={{ width: "25rem" }}>
                <FormLabel htmlFor="name">Nome do produto</FormLabel>
                <FormControl
                  type="text"
                  ref={nameRef}
                  required
                  maxLength={60}
                  title="insira aqui o nome do produto"
                  id="name"
                />
                <FormText className="text-muted ms-2 p-1">
                  Ex: SSD 480GB Kingston
                </FormText>
              </FormGroup>
              {/*  */}
            </Row>
            <Row className="mb-4">
              {/* brand */}
              <FormGroup className="me-5" style={{ width: "19.56rem" }}>
                <FormLabel htmlFor="brand">Marca</FormLabel>
                <FormControl
                  type="text"
                  ref={brandRef}
                  maxLength={30}
                  title="insira aqui o marca do produto"
                  id="brand"
                />
                <FormText className="text-muted ms-2 me-5 p-1">
                  Ex: Kingston
                </FormText>
              </FormGroup>
              {/*  */}
              {/* category */}
              <FormGroup style={{ width: "19.56rem" }}>
                <FormLabel className="mb-3" htmlFor="category">
                  Categoria
                </FormLabel>
                {
                  <DropdownSelector
                    onclick={(e) =>
                      setCategoryCurrentID(Number(e.currentTarget.id))
                    }
                  />
                }
              </FormGroup>
              {/* */}
            </Row>
            <Row className="mb-4">
              {/* description */}
              <FormGroup style={{ width: "28.12rem" }}>
                <FormLabel htmlFor="description">Descrição</FormLabel>
                <FormControl
                  as="textarea"
                  style={{ width: "50vw", height: "25rem" }}
                  ref={descriptionRef}
                  maxLength={3000}
                  title="descreva o produto produto em até 3000 caracteres"
                  placeholder="Considerado um dispositivo de alto desempenho, a unidade em estado sólido A400 da Kingston é projetada para...
                "
                  id="description"
                />
              </FormGroup>
              {/*   */}
            </Row>
            <Row className="mb-4">
              {/* images */}
              <FormGroup style={{ width: "19.56rem" }}>
                <FormLabel>Imagens do Produto</FormLabel>
                <Form.Control
                  type="file"
                  isInvalid={imagesIsInvalid}
                  accept="image/jpeg, image/jpg, image/webp,  image/png"
                  ref={refImages}
                  onInput={() => handleImagesInput(refImages)}
                  title="selecione até 5 imagens para o produto, co tamanho de até 350KB(cada)"
                  id="images"
                  multiple
                />
                <FormText className="text-muted ms-2 p-1">
                  Até 5 imagens
                </FormText>
              </FormGroup>
              <FormGroup className="w-100">
                <Container
                  className="d-flex justify-content-start"
                  style={{ width: "fit-content", height: "200px" }}
                >
                  {imgSrc !== null ? (
                    <>
                      {imgSrc.map((src): JSX.Element => {
                        return (
                          <Image
                            key={src!.id}
                            className="m-3 w-75"
                            style={{ maxWidth: "9.61rem", maxHeight: "9.5rem" }}
                            id={src!.id}
                            thumbnail
                            src={src.imageBase64}
                          />
                        );
                      })}
                    </>
                  ) : null}
                </Container>
              </FormGroup>
              {/*  */}
            </Row>
            <Row className="mb-4">
              {/* price */}
              <FormGroup style={{ width: "19.56rem" }}>
                <FormLabel htmlFor="price">Preço de Venda</FormLabel>
                <InputGroup>
                  <InputGroup.Text>R$</InputGroup.Text>

                  <FormControl
                    type="text"
                    aria-label="valor em reais"
                    ref={priceRef}
                    pattern="[0-9]+([,][0-9]+)?"
                    title="insira o preço que irá vender o produto"
                    id="price"
                  />
                </InputGroup>
              </FormGroup>
              {/*  */}
              <FormGroup style={{ width: "19.56rem" }}>
                <FormLabel htmlFor="costPrice">Preço de Custo</FormLabel>
                {/* cost price */}
                <InputGroup>
                  <InputGroup.Text>R$</InputGroup.Text>
                  <FormControl
                    type="text"
                    aria-label="valor em reais"
                    ref={costPriceRef}
                    pattern="[0-9]+([,][0-9]+)?"
                    title="insira o valor que custo o produto"
                    id="costPrice"
                  />
                </InputGroup>
              </FormGroup>
              {/*  */}
            </Row>
            <Row>
              <Col sm={4}>
                <Row className="mb-4">
                  <Row className="mb-2">
                    {/* length */}
                    <FormGroup style={{ width: "10rem" }}>
                      <FormLabel htmlFor="length">Comprimentro</FormLabel>
                      <InputGroup>
                        <FormControl
                          type="number"
                          step={0.01}
                          ref={lengthRef}
                          aria-label="valor em centímetro"
                          id="length"
                        />
                        <InputGroup.Text>cm</InputGroup.Text>
                      </InputGroup>
                    </FormGroup>
                    {/*  */}
                    {/* width */}
                    <FormGroup style={{ width: "10rem" }}>
                      <FormLabel htmlFor="width">Largura</FormLabel>
                      <InputGroup>
                        <FormControl
                          type="number"
                          step={0.01}
                          ref={widthRef}
                          aria-label="valor em centímetro"
                          id="width"
                        />
                        <InputGroup.Text>cm</InputGroup.Text>
                      </InputGroup>
                    </FormGroup>
                    {/* */}
                  </Row>
                  <Row className="mb-2">
                    {/* heigth */}
                    <FormGroup style={{ width: "10rem" }}>
                      <FormLabel htmlFor="heigth">Altura</FormLabel>
                      <InputGroup>
                        <FormControl
                          type="number"
                          step={0.01}
                          ref={heigthRef}
                          aria-label="valor em centímetro"
                          id="heigth"
                        />
                        <InputGroup.Text>cm</InputGroup.Text>
                      </InputGroup>
                    </FormGroup>
                    {/* */}
                    <FormGroup style={{ width: "11.5rem" }}>
                      <FormLabel htmlFor="weigth">Peso</FormLabel>
                      {/* weigth */}
                      <InputGroup>
                        <FormControl
                          type="number"
                          step={0.01}
                          ref={weigthRef}
                          aria-label="valor em gramas"
                          id="weigth"
                        />
                        <InputGroup.Text>g</InputGroup.Text>
                      </InputGroup>
                      {/* */}
                    </FormGroup>
                  </Row>
                </Row>
              </Col>
              <Col>
                <Row>
                  {/* warranty */}
                  <FormGroup style={{ width: "10rem" }}>
                    <FormLabel htmlFor="warranty">Garantia</FormLabel>
                    <FormControl
                      type="number"
                      step={0.01}
                      ref={warrantyRef}
                      placeholder="0 dias"
                      title="insira o valor da garantia em dias. Ex: 90 é o mesmo que 3 meses"
                      aria-label="valor em dia"
                      id="warranty"
                    />
                  </FormGroup>
                  {/* */}
                  {/* stock */}
                  <FormGroup style={{ width: "10.5rem" }}>
                    <FormLabel htmlFor="stock">Estoque</FormLabel>
                    <FormControl
                      type="number"
                      ref={stockRef}
                      placeholder="0 unidades"
                      title="Ex: 1, 3..."
                      aria-label="valor em dia"
                      id="stock"
                    />
                  </FormGroup>
                  {/* */}
                </Row>
              </Col>
            </Row>
          </Col>
          {/* buttons*/}
          <FormGroup className="align-self-end">
            <Button type="submit" variant="outline-primary" className="me-5">
              Cadastrar
            </Button>
            <Button
              id="btnCancelar"
              variant="outline-danger"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};

export default CadastroProduto;
