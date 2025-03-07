import React, { useState, useEffect, useRef } from "react";
import { Input, Empty, Spin, ConfigProvider } from "antd";
import { useGetSearchQuery } from "../../redux/api/movie.api";
import { useSearchParams } from "react-router-dom";
import Movies from "@/components/Movies";

const Search = () => {
    const { Search } = Input;
    const [params, setParams] = useSearchParams();
    const query = params.get("q") || "";
    const [auto] = useState(false);
    const [setPercent] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        if (auto) {
            timerRef.current = setInterval(() => {
                setPercent((prev) => (prev >= 100 ? 0 : prev + 5));
            }, 200);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [auto]);

    const onSearch = (value) => {
        if (value.trim()) {
            params.set("q", value);
        } else {
            params.delete("q");
        }
        setParams(params);
    };

    const { data, isLoading } = useGetSearchQuery(
        { include_adult: false, query: query },
        { skip: !query }
    );

    return (
        <div className="container mx-auto max-w-[1308px] text-white p-4">
         
            <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto mt-2">
                <ConfigProvider
                    theme={{
                        token: {
                            borderRadius: 15,
                            lineHeight: 3,
                        },
                    }}
                >
                    <Search
                        className="dark:bg-black w-full"
                        placeholder="Search movie"
                        defaultValue={query}
                        onSearch={onSearch}
                        enterButton
                        autoFocus
                    />
                </ConfigProvider>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center mt-10">
                    <Spin size="large" />
                </div>
            )}

     
            {!isLoading && !data?.total_results && (
                <div className="mt-6 flex justify-center">
                    <Empty description="No movies found" className="text-gray-300" />
                </div>
            )}

            <div className="mt-6">
                <Movies data={data} />
            </div>
        </div>
    );
};

export default React.memo(Search);
