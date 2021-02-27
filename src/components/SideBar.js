import { Create, Drafts, Inbox, Add, ExpandMore, BookmarkBorder, FiberManualRecord, InsertComment, PeopleAlt, FileCopy } from '@material-ui/icons'
import React from 'react'
import styled from "styled-components"
import SideBarOptions from "./SideBarOptions"
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase"

export default function SideBar() {
    const [channels, loading, error] = useCollection(db.collection('room'));
    const [user] = useAuthState(auth);

    return (
        <SideBarContainer>
            <SideBarHeader>
                <SideBarInfo>
                    <h2> {user?.displayName} </h2>
                    <h4>
                        <FiberManualRecord />
                        {user?.email}
                    </h4>
                </SideBarInfo>
                <Create />
            </SideBarHeader>

            <SideBarOptions Icon={InsertComment} title="Tread" />
            <SideBarOptions Icon={Inbox} title="Mentions" />
            <SideBarOptions Icon={Drafts} title="Charts" />
            <SideBarOptions Icon={BookmarkBorder} title="Bookamrk" />
            <SideBarOptions Icon={PeopleAlt} title="People" />
            <SideBarOptions Icon={FileCopy} title="file" />
            <hr />
            <SideBarOptions Icon={ExpandMore} title="Channel" />
            <hr />
            <SideBarOptions Icon={Add} title="Add Channel" addChannelOption />
            {channels?.docs.map(doc => 
                    <SideBarOptions key={doc.id} id={doc.id} title={doc.data().name}  />
                )}
        </SideBarContainer>
    )
}


const SideBarContainer = styled.div`
    background-color: var(--slack-color);
    color: white;
    flex: 0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;

    >hr {
        margin: 10px 0;
        border: 1px solid #49274b;
    }
`;

const SideBarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;
    

    > .MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 50%;
    }
`;

const SideBarInfo = styled.div`
    flex: 1;

    >h2 {
        font-size: 15px;
        font-weight: 800;
        margin-bottom: 5px;
    }

    >h4 {
        display: flex;
        align-items: center;
        font-size: 13px;
        font-weight: 400;
    }

    >h4 >.MuiSvgIcon-root{
        font-size: 14px;
        color: green;
        margin-right: 2px;
        margin-top: 1px;
    }
`;