import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { useForm } from "react-hook-form";

export default function NewPost() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { slug } = useParams();
  const isEditing = !!slug;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tagList: [],
    },
  });

  const selectedTags = watch("tagList");

  const onSubmit = async (formCreateArticle) => {
    try {
      let data;
      if (isEditing) {
        data = await api.put(`/articles/${slug}`, {
          article: formCreateArticle,
        });
      } else {
        data = await api.post("/articles", {
          article: formCreateArticle,
        });
      }
      navigate(`/articles/${data.article.slug}`);
    } catch {
      alert("Article not created");
    }
  };

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setValue(
        "tagList",
        selectedTags.filter((t) => t !== tag),
      );
    } else {
      setValue("tagList", [...selectedTags, tag]);
    }
  };

  /*editing view*/

  useEffect(() => {
    if (isEditing) {
      api.get(`/articles/${slug}`).then((data) => {
        reset({
          title: data.article.title,
          description: data.article.description,
          body: data.article.body,
          tagList: data.article.tagList,
        });
      });
    }
  }, [slug, isEditing, reset]);

  return (
    <div className="newpost-container general-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="newpost-form general-form"
      >
        <input
          type="text"
          className="general-user-input"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p>{errors.title.message}</p>}
        <input
          type="text"
          className="general-user-input"
          placeholder="Short description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <p>{errors.description.message}</p>}
        <textarea
          type="text"
          className="newpost-user-input-text"
          placeholder="Input your text"
          {...register("body", { required: "Body is required" })}
        />
        {errors.body && <p>{errors.body.message}</p>}

        <div className="general-tags">
          {["one", "something", "chinese", "english", "spanish"].map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={
                selectedTags.includes(tag)
                  ? "newpost-tag-selected"
                  : "newpost-tag-unselected"
              }
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="newpost-publish-container">
          <Button type="submit">Publish Article</Button>
        </div>
      </form>
    </div>
  );
}
