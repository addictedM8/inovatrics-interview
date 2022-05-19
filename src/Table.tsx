
import * as React from 'react';
import { useQuery } from 'urql';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import Detail from './Detail';
import { Chip, Dialog } from '@mui/material';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
    },
    {
        field: 'rocket',
        headerName: 'Rocket',
        flex: 1,
    },
    {
        field: 'date',
        headerName: 'Date',
        type: 'date',
        flex: 1,
    },
    {
        field: 'result',
        headerName: 'Result',
        flex: 1,
        renderCell: (params: GridRenderCellParams<boolean>) => (
            params.value ? <Chip label="success" color="success" /> : <Chip label="failed" color="error" />
        ),
    },
];

export default function Table() {
    const [rowId, setRowId] = React.useState<number | undefined>();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [result, reexecuteQuery] = useQuery<LaunchesPast | undefined>({
        query: TodosQuery,
    });

    const { data, fetching, error } = result;

    const rows = data?.launchesPast?.map((launch: Launch, index: number) => (
        {
            id: index,
            name: launch.mission_name,
            rocket: launch.rocket.rocket_name,
            date: launch.launch_date_local?.toLocaleString(),
            result: !launch.rocket?.first_stage.cores.some(core => !core.land_success),
        })) || [];

    const selectedRowData = (rowId != undefined ? data?.launchesPast[rowId] : {}) as Launch;

    const handleClick = (params: GridRowParams) => {
        setRowId(Number(params?.id));
        setIsModalOpen(true);
    }

    if (!!error)
        return (
            <div>
                <h3>{error.name}</h3>
                <p>{error.message}</p>
            </div>
        )

    return (
        <>
            <div className='tableWrapper'>
                <DataGridPro
                    loading={fetching}
                    rows={rows}
                    columns={columns}
                    hideFooter
                    onRowClick={handleClick}
                />
            </div>
            <Dialog
                maxWidth={false}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <Detail
                    name={selectedRowData.mission_name}
                    link={selectedRowData?.links?.article_link}
                    youtubeLink={selectedRowData?.links?.video_link}
                    date={selectedRowData?.launch_date_local}
                />
            </Dialog>
        </>
    );
}

const TodosQuery = `query {
    launchesPast(limit: 100) {
        mission_name
        launch_date_local
        launch_site {
            site_name_long
        }
        links {
            article_link
            video_link
        }
        rocket {
            rocket_name
            first_stage {
                cores {
                    flight
                    land_success
                }
            }
            second_stage {
                payloads {
                    payload_type
                    payload_mass_kg
                    payload_mass_lbs
                }
            }
        }
        launch_success
    }
}`;