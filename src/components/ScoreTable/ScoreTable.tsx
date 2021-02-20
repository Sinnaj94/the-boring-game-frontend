import React, {useEffect} from 'react';
import styles from './ScoreTable.module.css';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import {IPlayer} from "../../models/player";
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import PersonIcon from '@material-ui/icons/Person';
import {SortDirection} from "@material-ui/data-grid";

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'username', headerName: 'Username', width: 300 },
    { field: 'score', headerName: 'Score', width: 200 },
]

const sortModel = [
    {
        field: 'score',
        sort: 'desc' as SortDirection,
    },
];

const playerToString = function(player: IPlayer) {
    return `${player.username} (ID: ${player.id}) - Score: ${player.score}`
}

const ScoreTable: React.FC<{players : IPlayer[], topPlayer? : IPlayer, worstPlayer? : IPlayer, currentPlayer? : IPlayer}> = ({players, topPlayer, worstPlayer, currentPlayer}) => (
  <Box mb={10} className={styles.ScoreTable} data-testid="ScoreTable">
      <h2>Results</h2>
      {currentPlayer?<h3 className={styles.ScoreTableCurrent}><PersonIcon/><span style={{marginLeft: 10}}>{
          playerToString(currentPlayer)
      }</span></h3>:""}
      {topPlayer?<h3 className={styles.ScoreTableWinner}><ThumbUp/><span style={{marginLeft: 10}}>{
          playerToString(topPlayer)
      }</span></h3>:""}
      {worstPlayer?<h3 className={styles.ScoreTableLoser}><ThumbDown/><span style={{marginLeft: 10}}>{
          playerToString(worstPlayer)
      }</span></h3>:""}
      <DataGrid rows={players.map(val => ({
          id: val.id,
          username: val.username,
          score: val.score
      }))} columns={columns} autoHeight={true} sortModel={sortModel} />
  </Box>
);

export default ScoreTable;
