"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import PulsatingButton from "@/components/ui/PulsationButton";

export default function App() {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <div className="min-h-[80vh] flex flex-col items-center">
      <Card className="max-w-[340px] mt-10">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src="/img/profile.png" />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                TOKKHU's Official
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @tokkhuOfficial
              </h5>
            </div>
          </div>
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>
            The three man drop is a podcast that talks about the latest tech
          </p>
          <p className="font-extrabold">Member</p>
          <p>⋅ Nonthapan 6633118721</p>
          <p>⋅ Nonthapan 6633118721</p>
          <p>⋅ Nonthapan 6633118721</p>
          <p>⋅ Nonthapan 6633118721</p>
          <span className="pt-2">
            #ThreeManDrop
            <span className="py-2" aria-label="computer" role="img">
              💻
            </span>
          </span>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">4</p>
            <p className=" text-default-400 text-small">Following</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">97.1K</p>
            <p className="text-default-400 text-small">Followers</p>
          </div>
        </CardFooter>
      </Card>
      <div className="flex justify-center">
        <PulsatingButton className="font-line font-black text-4xl mt-16">
            เปิดตู้เติมของ
        </PulsatingButton>
      </div>
    </div>
  );
}
