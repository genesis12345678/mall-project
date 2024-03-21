import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { postAdd } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/UseCustomMove";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const initState = {
  pName: "",
  pDesc: "",
  price: 0,
  files: [],
};

//FormData 객체에 파일 데이터를 심어서 보내야 한다. POST, PUT

function AddComponent(props) {
  const [product, setProduct] = useState(initState);

  const uploadRef = useRef();
  // const [fetching, setFetching] = useState(false);
  // const [result, setResult] = useState(false);
  const { moveToList } = useCustomMove();

  const addMutation = useMutation({
    mutationFn: (proudct) => postAdd(proudct),
  });

  // multipart/form-data FormDate()

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  const handleClickAdd = (e) => {
    console.log(product);

    const formData = new FormData();

    const files = uploadRef.current.files;

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("pName", product.pName);
    formData.append("pDesc", product.pDesc);
    formData.append("price", product.price);

    console.log(formData);

    // setFetching(true);

    // postAdd(formData).then((data) => {
    //   setFetching(false);
    //   setResult(data.result);
    // });

    addMutation.mutate(formData);
  };

  const queryClient = useQueryClient();

  const closeModal = () => {
    // setResult(null);

    queryClient.invalidateQueries("products/list");
    moveToList({ page: 1 });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pName"
            type="text"
            value={product.pName}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Desc</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="pDesc"
            rows="4"
            onChange={handleChangeProduct}
            value={product.pDesc}
          >
            {product.pDesc}
          </textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Price</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="price"
            type={"number"}
            value={product.price}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white "
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>
      {addMutation.isPending ? <FetchingModal /> : <></>}

      {addMutation.isSuccess ? (
        <ResultModal
          title={"Prdouct Add Result"}
          content={`${addMutation.data.result}번 상품 등록 완료`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default AddComponent;
